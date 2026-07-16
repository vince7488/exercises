<script setup>
import { computed, onMounted, ref } from 'vue';
import DeleteSubscriberDialog from '../components/DeleteSubscriberDialog.vue';
import { deleteSubscriber, getSubscribers } from '../services/newsletterApi';

const subscribers = ref([]);
const loading = ref(true);
const loadError = ref('');
const deleteError = ref('');
const selectedSubscriber = ref(null);
const deleteDialogOpen = ref(false);
const deletingId = ref(null);
const deletedMessage = ref('');

const creationFields = ['created_at', 'createdAt', 'date_created', 'created', 'timestamp', 'updated_at'];

function recordId(subscriber) {
  return subscriber?.id ?? subscriber?._id ?? subscriber?.subscriber_id;
}

function creationTime(subscriber) {
  const rawValue = creationFields.map((field) => subscriber?.[field]).find((value) => value !== undefined && value !== null);
  const timestamp = Date.parse(rawValue);
  return Number.isNaN(timestamp) ? null : timestamp;
}

function sortNewestFirst(records) {
  // Prefers a real creation time, then uses descending numeric IDs when the API omits a timestamp.
  return [...records].sort((first, second) => {
    const firstTime = creationTime(first);
    const secondTime = creationTime(second);

    if (firstTime !== null || secondTime !== null) {
      return (secondTime ?? 0) - (firstTime ?? 0);
    }

    const firstId = Number(recordId(first));
    const secondId = Number(recordId(second));
    return Number.isFinite(firstId) && Number.isFinite(secondId) ? secondId - firstId : 0;
  });
}

function columnTitle(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (letter) => letter.toUpperCase());
}

const dataHeaders = computed(() => {
  // Builds columns from every returned key so undocumented API fields do not disappear from the table.
  const keys = new Set();
  subscribers.value.forEach((subscriber) => {
    Object.keys(subscriber).forEach((key) => keys.add(key));
  });

  return [...keys].map((key) => ({
    title: columnTitle(key),
    key,
    sortable: true,
  }));
});

const tableHeaders = computed(() => [...dataHeaders.value, { title: 'Actions', key: 'actions', sortable: false, align: 'end' }]);

async function loadSubscribers() {
  loading.value = true;
  loadError.value = '';

  try {
    subscribers.value = sortNewestFirst(await getSubscribers());
  } catch (error) {
    loadError.value = error.message || 'The subscriber list could not be loaded.';
  } finally {
    loading.value = false;
  }
}

function openDeleteDialog(item) {
  // Vuetify may wrap rows internally, so the destructive flow always holds the original API record.
  selectedSubscriber.value = item?.raw ?? item;
  deleteError.value = '';
  deleteDialogOpen.value = true;
}

async function confirmDelete() {
  const id = recordId(selectedSubscriber.value);

  if (id === undefined || id === null) {
    deleteError.value = 'This record has no ID, so it cannot be removed safely.';
    deleteDialogOpen.value = false;
    return;
  }

  deletingId.value = id;
  deleteError.value = '';

  try {
    await deleteSubscriber(id);
    subscribers.value = subscribers.value.filter((subscriber) => recordId(subscriber) !== id);
    deletedMessage.value = 'Subscriber removed from the list.';
    deleteDialogOpen.value = false;
  } catch (error) {
    deleteError.value = error.message || 'The subscriber could not be removed.';
    deleteDialogOpen.value = false;
  } finally {
    deletingId.value = null;
    selectedSubscriber.value = null;
  }
}

onMounted(loadSubscribers);
</script>

<template>
  <section class="page-section">
    <v-container class="page-container" fluid>
      <div class="page-heading">
        <div>
          <p class="eyebrow">Newsletter admin</p>
          <h1>Manage the list</h1>
          <p class="page-heading__copy">Review every subscriber returned by the API, newest first.</p>
        </div>

        <v-btn :to="{ name: 'sign-up' }" size="large">Add subscriber</v-btn>
      </div>

      <v-alert v-if="loadError" class="mb-6" type="error" variant="tonal" title="Could not load the list">
        {{ loadError }}
        <template #append>
          <v-btn color="error" variant="outlined" @click="loadSubscribers">Retry</v-btn>
        </template>
      </v-alert>

      <v-alert v-if="deleteError" class="mb-6" type="error" variant="tonal" closable @click:close="deleteError = ''">
        {{ deleteError }}
      </v-alert>

      <v-card class="list-card" elevation="0">
        <div class="list-card__topline">
          <div>
            <h2>Current subscribers</h2>
            <p>{{ subscribers.length }} {{ subscribers.length === 1 ? 'record' : 'records' }}</p>
          </div>
          <v-btn color="secondary" variant="outlined" :loading="loading" @click="loadSubscribers"> Refresh </v-btn>
        </div>

        <v-progress-linear v-if="loading" color="primary" indeterminate />

        <div v-if="!loading && !loadError && subscribers.length === 0" class="empty-state">
          <p class="empty-state__mark" aria-hidden="true">0</p>
          <h2>No subscribers yet</h2>
          <p>The list is clean. Suspiciously clean. Add the first subscriber.</p>
          <v-btn :to="{ name: 'sign-up' }">Open sign-up form</v-btn>
        </div>

        <v-data-table
          v-else-if="!loadError"
          class="subscriber-table"
          :headers="tableHeaders"
          :items="subscribers"
          :items-per-page="10"
          :loading="loading"
          item-value="id"
          hover
        >
          <template #item.actions="{ item }">
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              :disabled="recordId(item?.raw ?? item) == null"
              :loading="deletingId === recordId(item?.raw ?? item)"
              @click="openDeleteDialog(item)"
            >
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </section>

  <DeleteSubscriberDialog
    v-model="deleteDialogOpen"
    :subscriber="selectedSubscriber"
    :deleting="deletingId !== null"
    @confirm="confirmDelete"
  />

  <v-snackbar v-model="deletedMessage" color="success" timeout="3500">
    {{ deletedMessage }}
  </v-snackbar>
</template>

<style lang="scss" scoped>
.list-card {
  overflow: hidden;
  border: 1px solid var(--colour-gray-300);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgb(72 64 62 / 8%) !important;
}

.list-card__topline {
  min-height: 112px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--colour-gray-300);

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: 1.35rem;
  }

  p {
    color: var(--colour-gray-600);
  }
}

.empty-state {
  min-height: 380px;
  padding: 56px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2,
  p {
    margin: 0 0 14px;
  }

  p:not(.empty-state__mark) {
    max-width: 480px;
    color: var(--colour-gray-600);
  }
}

.empty-state__mark {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  color: var(--colour-th-green);
  font-size: 2rem;
  font-weight: 800;
  background: #eef6ea;
  border-radius: 50%;
}

.subscriber-table :deep(th) {
  color: var(--colour-th-black);
  font-weight: 800 !important;
  background: #f4f1ef !important;
  white-space: nowrap;
}

.subscriber-table :deep(td) {
  min-width: 150px;
}

@media (max-width: 600px) {
  .list-card__topline {
    align-items: flex-start;
  }
}
</style>

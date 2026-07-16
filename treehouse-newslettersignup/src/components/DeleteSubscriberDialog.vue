<script setup>
defineProps({
  modelValue: Boolean,
  subscriber: {
    type: Object,
    default: null,
  },
  deleting: Boolean,
});

const emit = defineEmits(["update:modelValue", "confirm"]);
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="520"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title>Remove this subscriber?</v-card-title>
      <v-card-text>
        <strong>{{ subscriber?.name || subscriber?.email || "This record" }}</strong>
        will be removed from the newsletter list. This cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="secondary"
          variant="text"
          :disabled="deleting"
          @click="emit('update:modelValue', false)"
        >
          Keep subscriber
        </v-btn>
        <v-btn color="error" :loading="deleting" @click="emit('confirm')">
          Yes, remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

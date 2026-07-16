<script setup>
defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "accept"]);
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="660"
    scrollable
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="terms-title">Terms of use, the short version</v-card-title>
      <v-divider />
      <v-card-text class="terms-copy">
        <p>
          By joining the newsletter, you agree to receive useful marketing notes,
          occasional company news, and absolutely no messages written by a committee
          of twelve buzzwords.
        </p>
        <p>
          Use an email address you control. Do not sign up your enemies, your nan,
          or the neighbour's unusually judgemental cat. You may leave the list when
          you like. We will not make you solve a maze first.
        </p>
        <v-alert type="info" variant="tonal">
          Serious bit: newsletter details should be handled only for sending the
          newsletter and managing the subscription.
        </v-alert>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" variant="text" @click="emit('update:modelValue', false)">
          Close
        </v-btn>
        <v-btn @click="emit('accept')">Agree and continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.terms-title {
  white-space: normal;
  color: var(--colour-background-white);
  background: var(--colour-secondary);
}

.terms-copy {
  padding-top: 26px !important;

  p {
    margin: 0 0 20px;
  }
}
</style>

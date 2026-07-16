<script setup>
import { computed, nextTick, ref } from "vue";
import TermsDialog from "../components/TermsDialog.vue";
import { createSubscriber } from "../services/newsletterApi";

const formRef = ref(null);
const name = ref("");
const email = ref("");
const confirmEmail = ref("");
const agreedToTerms = ref(false);
const termsDialogOpen = ref(false);
const saving = ref(false);
const submitError = ref("");
const successMessage = ref("");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requiredRule = (value) => Boolean(String(value ?? "").trim()) || "This field is required.";
const emailRule = (value) => emailPattern.test(String(value ?? "").trim()) || "Enter a valid email address.";
const matchingEmailRule = (value) => value === email.value || "The email addresses do not match.";

const nameRules = [requiredRule];
const emailRules = [requiredRule, emailRule];
const confirmEmailRules = [requiredRule, emailRule, matchingEmailRule];
const termsRules = [(value) => value === true || "Agree to the terms before signing up."];

const submitDisabled = computed(() => {
  // Mirrors every required rule so the button activates only when the form is ready to send.
  return (
    !name.value.trim() ||
    !emailPattern.test(email.value.trim()) ||
    confirmEmail.value !== email.value ||
    !agreedToTerms.value ||
    saving.value
  );
});

async function clearForm() {
  name.value = "";
  email.value = "";
  confirmEmail.value = "";
  agreedToTerms.value = false;
  submitError.value = "";
  successMessage.value = "";
  await nextTick();
  formRef.value?.resetValidation();
}

function acceptTerms() {
  agreedToTerms.value = true;
  termsDialogOpen.value = false;
}

async function submitForm() {
  const validation = await formRef.value?.validate();

  // Stops crafted or stale form state from reaching the API even if the disabled button is bypassed.
  if (!validation?.valid || submitDisabled.value) {
    return;
  }

  saving.value = true;
  submitError.value = "";
  successMessage.value = "";

  try {
    await createSubscriber({ name: name.value, email: email.value });
    successMessage.value = `${name.value.trim()} has been added to the newsletter.`;
    name.value = "";
    email.value = "";
    confirmEmail.value = "";
    agreedToTerms.value = false;
    await nextTick();
    formRef.value?.resetValidation();
  } catch (error) {
    submitError.value = error.message || "The sign-up could not be saved.";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <section class="page-section sign-up-page">
    <v-container class="page-container" fluid>
      <div class="page-heading page-heading--narrow">
        <div>
          <p class="eyebrow">Join the list</p>
          <h1>Newsletter sign-up</h1>
          <p class="page-heading__copy">
            Add a subscriber with a confirmed email address and clear consent.
          </p>
        </div>
      </div>

      <v-row>
        <v-col cols="12" lg="8">
          <v-card class="form-card" elevation="0">
            <v-card-text>
              <v-alert
                v-if="successMessage"
                class="mb-7"
                type="success"
                variant="tonal"
                closable
                @click:close="successMessage = ''"
              >
                {{ successMessage }}
              </v-alert>

              <v-alert
                v-if="submitError"
                class="mb-7"
                type="error"
                variant="tonal"
                title="Could not add the subscriber"
                closable
                @click:close="submitError = ''"
              >
                {{ submitError }}
              </v-alert>

              <v-form ref="formRef" validate-on="input" @submit.prevent="submitForm">
                <div class="form-intro">
                  <p class="form-step">Step 1 of 1</p>
                  <h2>Subscriber details</h2>
                  <p>All fields are required. Brief form, strict standards.</p>
                </div>

                <v-text-field
                  id="subscriber-name"
                  v-model="name"
                  label="Name"
                  :rules="nameRules"
                  autocomplete="name"
                  maxlength="120"
                  counter
                  required
                />

                <v-text-field
                  id="subscriber-email"
                  v-model="email"
                  label="Email address"
                  type="email"
                  :rules="emailRules"
                  autocomplete="email"
                  maxlength="254"
                  required
                />

                <v-text-field
                  id="subscriber-confirm-email"
                  v-model="confirmEmail"
                  label="Confirm email address"
                  type="email"
                  :rules="confirmEmailRules"
                  autocomplete="email"
                  maxlength="254"
                  required
                />

                <div class="terms-row">
                  <v-checkbox
                    v-model="agreedToTerms"
                    :rules="termsRules"
                    color="primary"
                    hide-details="auto"
                  >
                    <template #label>
                      <span>
                        I agree to the
                        <button class="terms-link" type="button" @click.stop="termsDialogOpen = true">
                          terms of use
                        </button>.
                      </span>
                    </template>
                  </v-checkbox>
                </div>

                <div class="form-actions">
                  <v-btn
                    color="secondary"
                    variant="outlined"
                    size="large"
                    type="button"
                    :disabled="saving"
                    @click="clearForm"
                  >
                    Clear
                  </v-btn>
                  <v-btn
                    size="large"
                    type="submit"
                    :disabled="submitDisabled"
                    :loading="saving"
                  >
                    Sign up
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card class="side-note" color="secondary" elevation="0">
            <v-card-text>
              <p class="side-note__number">Twice.</p>
              <h2>Why confirm the email?</h2>
              <p>
                A typo should not send good newsletters into the void. Matching the
                address twice catches the common slips before the request leaves the browser.
              </p>
              <v-divider class="my-6" opacity="0.35" />
              <p class="side-note__small">
                Only the name and email are sent to the newsletter API. The confirmation
                field and consent check stay in the interface.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <TermsDialog v-model="termsDialogOpen" @accept="acceptTerms" />
</template>

<style lang="scss" scoped>
.form-card {
  border: 1px solid var(--colour-gray-300);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgb(72 64 62 / 8%) !important;

  :deep(.v-card-text) {
    padding: 28px 20px;
  }
}

.form-intro {
  margin-bottom: 30px;

  h2,
  p {
    margin: 0;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 1.55rem;
  }

  p:not(.form-step) {
    color: var(--colour-gray-600);
  }
}

.form-step {
  margin-bottom: 8px !important;
  color: var(--colour-treehouse-green);
  font-size: var(--font-size-small);
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.terms-row {
  margin: 4px 0 22px;
  padding: 6px 14px;
  background: #f7f5f4;
  border: 1px solid var(--colour-gray-300);
  border-radius: 10px;
}

.terms-link {
  padding: 0;
  color: var(--colour-secondary);
  font-weight: 800;
  text-decoration: underline;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.form-actions {
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  gap: 12px;

  .v-btn {
    flex: 1 1 140px;
  }
}

.side-note {
  height: 100%;
  min-height: 310px;
  border-radius: 18px;

  :deep(.v-card-text) {
    padding: 34px 28px;
  }

  h2,
  p {
    color: var(--colour-background-white);
  }

  h2 {
    margin: 0 0 18px;
    font-size: 1.55rem;
  }

  p {
    margin: 0;
  }
}

.side-note__number {
  margin-bottom: 18px !important;
  color: #d7ebcd !important;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
}

.side-note__small {
  color: #f1eae7 !important;
  font-size: var(--font-size-small);
}

@media (min-width: 600px) {
  .form-card :deep(.v-card-text) {
    padding: 42px;
  }

  .form-actions .v-btn {
    flex: 0 0 auto;
    min-width: 150px;
  }
}
</style>

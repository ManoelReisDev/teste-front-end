import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '../../../shared/ui/Button/Button'
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox'
import { Input } from '../../../shared/ui/Input/Input'
import { Label } from '../../../shared/ui/Label/Label'
import styles from './Newsletter.module.scss'

export interface NewsletterSubmission {
  name: string
  email: string
  acceptedTerms: true
}

export type NewsletterSubmitHandler = (
  submission: NewsletterSubmission,
) => Promise<void>

interface NewsletterProps {
  onSubmit?: NewsletterSubmitHandler
}

export function Newsletter({ onSubmit }: NewsletterProps) {
  const instanceId = useId()
  const nameId = `${instanceId}-newsletter-name`
  const emailId = `${instanceId}-newsletter-email`
  const consentId = `${instanceId}-newsletter-consent`
  const nameErrorId = `${nameId}-error`
  const emailErrorId = `${emailId}-error`
  const consentErrorId = `${consentId}-error`
  const statusId = `${instanceId}-newsletter-status`
  const isSubmittingRef = useRef(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [consentError, setConsentError] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!onSubmit || isSubmittingRef.current) {
      return
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setNameError('Informe seu nome.')
      const nameField = event.currentTarget.elements.namedItem('name')

      if (nameField instanceof HTMLElement) {
        nameField.focus()
      }
      return
    }

    if (!acceptedTerms) {
      setConsentError('Aceite os termos e condições para continuar.')
      return
    }

    setNameError('')
    setEmailError('')
    setConsentError('')
    setSubmissionError('')
    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      await onSubmit({
        name: trimmedName,
        email: trimmedEmail,
        acceptedTerms: true,
      })
    } catch {
      setSubmissionError('Não foi possível concluir o envio. Tente novamente.')
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby={`${instanceId}-newsletter-title`} className={styles.newsletter}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={`${instanceId}-newsletter-title`}>Inscreva-se na nossa newsletter</h2>
          <p>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da
            Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <Label htmlFor={nameId} visuallyHidden>
                Nome
              </Label>
              <Input
                aria-describedby={nameError ? nameErrorId : undefined}
                aria-invalid={Boolean(nameError)}
                autoComplete="name"
                id={nameId}
                name="name"
                onChange={(event) => {
                  setName(event.target.value)
                  setNameError('')
                  setSubmissionError('')
                }}
                onInvalid={() => setNameError('Informe seu nome.')}
                placeholder="Digite seu nome"
                required
                type="text"
                value={name}
                variant="default"
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor={emailId} visuallyHidden>
                E-mail
              </Label>
              <Input
                aria-describedby={emailError ? emailErrorId : undefined}
                aria-invalid={Boolean(emailError)}
                autoComplete="email"
                id={emailId}
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailError('')
                  setSubmissionError('')
                }}
                onInvalid={() => setEmailError('Informe um e-mail válido.')}
                placeholder="Digite seu e-mail"
                required
                type="email"
                value={email}
                variant="default"
              />
            </div>

            <Button
              aria-busy={isSubmitting}
              aria-describedby={submissionError ? statusId : undefined}
              className={styles.submit}
              disabled={isSubmitting}
              type="submit"
              unavailable={!onSubmit}
              variant="accent"
            >
              INSCREVER
            </Button>
          </div>

          <Label className={styles.consent} htmlFor={consentId} surface="dark">
            <Checkbox
              aria-describedby={consentError ? consentErrorId : undefined}
              aria-invalid={Boolean(consentError)}
              checked={acceptedTerms}
              id={consentId}
              name="acceptedTerms"
              onChange={(event) => {
                setAcceptedTerms(event.target.checked)
                setConsentError('')
                setSubmissionError('')
              }}
              onInvalid={() =>
                setConsentError('Aceite os termos e condições para continuar.')
              }
              required
            />
            Aceito os termos e condições
          </Label>

          <div className={styles.messages}>
            {nameError && (
              <p id={nameErrorId} role="alert">
                {nameError}
              </p>
            )}
            {emailError && (
              <p id={emailErrorId} role="alert">
                {emailError}
              </p>
            )}
            {consentError && (
              <p id={consentErrorId} role="alert">
                {consentError}
              </p>
            )}
            <p aria-live="polite" id={statusId} role="status">
              {isSubmitting ? 'Enviando inscrição.' : submissionError}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

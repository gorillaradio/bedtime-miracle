# UI Test - Create Story

## Obiettivo

Testare l'interfaccia per la creazione di storie prima di implementare la logica.

## Flusso previsto

1. **Input iniziale** - L'utente descrive l'idea della storia (testo o audio)
2. **Domande integrative** - L'AI chiede dettagli, l'utente risponde (testo o audio)
3. **Genera storia** - Quando il contesto è sufficiente

## Varianti testate

### Variante A (scartata)
- Textarea sempre visibile
- Pulsante "Registra audio" accanto
- Stile tipo WhatsApp

### Variante B (scelta)
- Scelta iniziale tra "Scrivi" e "Registra"
- Clic su "Scrivi" → apre textarea
- Clic su "Registra" → apre interfaccia registrazione
- Pulsante "Annulla" per tornare alla scelta

## Componenti creati

- `app/components/story/story-input-b.tsx` - Componente input con toggle testo/audio
- `app/routes/create-story.tsx` - Pagina di test

## Componenti shadcn aggiunti

- `textarea`
- `scroll-area`
- `badge`
- `tooltip`
- `separator`

## Prossimi step

- [ ] Implementare flusso multi-step con domande integrative
- [ ] Integrare registrazione audio reale
- [ ] Collegare con AI per generazione domande

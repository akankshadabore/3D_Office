
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function uid() {
  return Math.random().toString(36).slice(2, 10)
}

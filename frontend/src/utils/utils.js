export function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

export const configApi = {
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

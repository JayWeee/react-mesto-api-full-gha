export function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

export const configApi = {
  url: 'https://api.project.mesto.student.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
};

import { TRANSACTION_URL, BACKEND_URL } from '../../config.js';

const USER_ID = 'ahmed';

export default {
  createOrUpdateMerchantList: (list) => (
    fetch(`${BACKEND_URL}/api/merchant/`, {
      method: 'POST',
      body: JSON.stringify({ user_id: USER_ID, list }),
    })
    .then(data => data)
    .catch(() => false)
  ),
  getMerchantList: () => (
    fetch(`${BACKEND_URL}/api/merchant/${USER_ID}`)
      .then(response => {
        if (response.status === 404) return null;
        return response.json();
      })
      .then(data => data?.list)
      .catch(() => null)
  ),
  getTransations: (handleError) => (
    fetch(TRANSACTION_URL)
      .then(response => response.json())
      .catch(() => handleError(true))
  )
}

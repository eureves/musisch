import { createPinia, setActivePinia } from 'pinia'
import useUserStore from '@/stores/User'

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('auth user', async () => {
    const store = useUserStore()

    expect(store.userLoggedIn).not.toBe(true)

    await store.authenticate({})

    expect(store.userLoggedIn).toBe(true)
  })
})

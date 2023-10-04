import { createPinia, setActivePinia } from 'pinia'
import useUserStore from '@/stores/User'

vi.mock('@/includes/firebas', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve()
  }
}))

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('authenticates user', async () => {
    const store = useUserStore()

    expect(store.userLoggedIn).not.toBe(true)
    await store.authenticate({})
    expect(store.userLoggedIn).toBe(true)
  })
})

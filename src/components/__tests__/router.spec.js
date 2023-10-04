import SongItem from '@/components/SongItem.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

describe('Router', () => {
  it('renders router link', () => {
    const song = {
      docId: 'foobar'
    }

    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId },
      query: { sort: 'new' }
    })
  })
})

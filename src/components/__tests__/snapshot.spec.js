import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('snapshots SongItem.vue', () => {
  it('renders correctly', () => {
    const song = {
      docId: 'abc',
      modifiedName: 'hello',
      displayName: "it's me",
      commentCount: 228
    }

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})

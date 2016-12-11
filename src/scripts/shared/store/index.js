import { ImagesStore } from './images'
import { ArticlesStore } from './articles'
import { StoriesStore } from './stories'

export function createStores() {
  const images = new ImagesStore()
  const articles = new ArticlesStore()
  const stories = new StoriesStore()
  return {
    images,
    articles,
    stories
  }
}

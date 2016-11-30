import { ImagesStore } from './images'
import { ArticlesStore } from './articles'

export function createStores() {
  const images = new ImagesStore()
  const articles = new ArticlesStore()
  return {
    images,
    articles
  }
}

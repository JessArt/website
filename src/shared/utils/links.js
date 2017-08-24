export const articleLink = ({ ID, id } = {}) => ({
  pathname: `/travel/${ID || id}`
})

export const imageLink = ({ id, ID, type, Type } = {}, query = {}) => ({
  pathname: `/media/${ID || id}`,
  query: {
    ...query,
    type: Type || type
  }
})

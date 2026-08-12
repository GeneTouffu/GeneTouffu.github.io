import { ref } from 'vue'

export interface Blog {
  title: string
  date: string
  tags: string[]
  slug: string
  category: string | null
  path: string
}

const blogs = ref<Blog[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)

let fetchPromise: Promise<void> | null = null

async function loadBlogs(): Promise<void> {
  if (blogs.value.length > 0) {
    return
  }

  if (fetchPromise) {
    return fetchPromise
  }

  loading.value = true
  error.value = null

  fetchPromise = fetch('/blog-index.json')
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load blogs: ${response.status}`
        )
      }

      blogs.value = await response.json()
    })
    .catch((err) => {
      error.value = err
      throw err
    })
    .finally(() => {
      loading.value = false
      fetchPromise = null
    })

  return fetchPromise
}

function getAll(): Blog[] {
  return blogs.value
}

function getByPath(path: string): Blog | undefined {
  return blogs.value.find((blog) => blog.path === path)
}

function getByCategory(category: string): Blog[] {
  return blogs.value.filter(
    (blog) => blog.category === category
  )
}

function getByTag(tag: string): Blog[] {
  return blogs.value.filter(
    (blog) => blog.tags.includes(tag)
  )
}

function getCategories(): string[] {
  return [...new Set(
    blogs.value
      .map((blog) => blog.category)
      .filter(
        (category): category is string =>
          category !== null
      )
  )]
}

function getTags(): string[] {
  return [...new Set(
    blogs.value.flatMap((blog) => blog.tags)
  )]
}

function getRecent(): Blog[] {
  return [...blogs.value].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )
}

export function useBlogStore() {
  return {
    blogs,
    loading,
    error,

    loadBlogs,

    getAll,
    getByPath,
    getByCategory,
    getByTag,
    getCategories,
    getTags,
    getRecent
  }
}
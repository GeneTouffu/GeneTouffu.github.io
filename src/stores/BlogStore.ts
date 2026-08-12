import { ref } from "vue";

export interface Blog {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  category: string | null;
}

const blogs = ref<Blog[]>([]);
const loading = ref(false);
const error = ref<Error | null>(null);

let fetchPromise: Promise<void> | null = null;

const blogFiles = import.meta.glob("../../blog/**/*.md", {
  query: "?raw",
  import: "default",
});

async function loadBlogs(): Promise<void> {
  if (blogs.value.length > 0) {
    return;
  }

  if (fetchPromise) {
    return fetchPromise;
  }

  loading.value = true;
  error.value = null;

  fetchPromise = fetch(`/blog-index.json?t=${Date.now()}`) // TODO: Make this not dumb
    .then(async (response) => { 
      if (!response.ok) {
        throw new Error(`Failed to load blogs: ${response.status}`);
      }

      blogs.value = await response.json();
    })
    .catch((err) => {
      error.value = err;
      throw err;
    })
    .finally(() => {
      loading.value = false;
      fetchPromise = null;
    });

  return fetchPromise;
}

function getAll(): Blog[] {
  return blogs.value;
}

function getBySlug(slug: string): Blog | undefined {
  return blogs.value.find((blog) => blog.slug === slug);
}

function getByCategory(category: string): Blog[] {
  return blogs.value.filter((blog) => blog.category === category);
}

function getByTag(tag: string): Blog[] {
  return blogs.value.filter((blog) => blog.tags.includes(tag));
}

function getCategories(): string[] {
  return [
    ...new Set(
      blogs.value
        .map((blog) => blog.category)
        .filter((category): category is string => category !== null),
    ),
  ];
}

function getTags(): string[] {
  return [...new Set(blogs.value.flatMap((blog) => blog.tags))];
}

function getRecent(): Blog[] {
  return [...blogs.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

async function loadContent(slug: string): Promise<string | undefined> {
  const blog = getBySlug(slug);

  if (!blog) {
    return undefined;
  }

  const path = `../../blog/${blog.slug}.md`;

  const loader = blogFiles[path] as (() => Promise<string>) | undefined;

  if (!loader) {
    return undefined;
  }

  const rawMarkdown = await loader();

  return rawMarkdown.replace(/^---[\s\S]*?---\s*/, "");
}

export function useBlogStore() {
  return {
    blogs,
    loading,
    error,

    loadBlogs,
    loadContent,

    getAll,
    getBySlug,
    getByCategory,
    getByTag,
    getCategories,
    getTags,
    getRecent,
  };
}

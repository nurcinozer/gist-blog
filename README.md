# Gist Based Blog

## Nextjs + Portfolio and Biography from Github + Posts from Gist ➡️ Your Personal Blog 🥳

This blog system get all informations from Github and Gist.

## Demo

🚀 https://gist-based-blog.vercel.app/

## How to use

1. Clone the repo
   First, clone the repo and install the dependencies.

```bash
git clone
cd gist-based-blog
npm install
```

2. Add your GitHub token
   Create a new file called `.env` in the root of the project and add your GitHub token.

```bash
GITHUB_TOKEN=YOUR_TOKEN
```

3. Add your GitHub username
   Open the `utils/services.ts` file and add your GitHub username.

```ts
const GITHUB_NAME = "YOUR_USERNAME";
```

4. Run the project

```bash
npm run dev
```

5. Open the project

```bash
http://localhost:3000
```

## How to create a post

1. Create a new gist with markdown extension (`.md`) and add this format for the metadata:

```md
---
title: "Post title"
category: "Post category"
date: "2020-01-01"
---

Your content here
```

## Tech Stack

- Typescript
- Nextjs
- Github API
- Tailwindcss
- Tailblocks

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/nurcinozer/gist-blog/issues).

## Show your support

Give a ⭐️ if this project helped you!

## Inspiration

- [Github Blog](https://github.com/bufgix/github-blog)
- [React Blog Github](https://github.com/saadpasta/react-blog-github)

```

```

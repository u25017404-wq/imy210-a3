# IMY 210 Assignment 3 - Reflection

GitHub Repository: https://github.com/u25017404-wq/imy210-a3

## Commands to Run

### Backend (Strapi)
docker build -t blog-backend ./backend
docker run -p 1337:1337 blog-backend

### Frontend (NuxtJS)
docker build -t blog-frontend ./frontend
docker run -p 3000:3000 blog-frontend

## Reflection

This assignment introduced me to the Jamstack ecosystem through the use of 
NuxtJS as the frontend framework and Strapi as the headless CMS backend. 
Setting up Strapi was straightforward thanks to its intuitive admin panel, 
which made creating content types and populating data simple and quick. 
Connecting the Strapi REST API to NuxtJS using useFetch allowed me to 
dynamically load blog posts without relying on any additional modules.

One of the biggest challenges I faced was rendering Strapi's Rich Text Blocks 
content, as it returns a JSON structure rather than plain HTML. I solved this 
by building a custom RichTextRenderer component in Vue that iterates over the 
blocks and renders each type accordingly.

Docker presented its own challenges, particularly around WSL configuration on 
Windows and network timeouts during the image build process. Through this I 
learned how containerisation works and how Dockerfiles define the environment 
needed to run an application consistently across different machines.

Overall this assignment gave me valuable hands-on experience with modern web 
development tools and taught me how a frontend and backend can be decoupled 
and deployed independently using containers.
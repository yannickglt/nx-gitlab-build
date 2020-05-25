# Blazing Fast Distributed CI with Nx Workspaces

Nx is a set of extensible dev tools for monorepos. Monorepos provide a lot of advantages:

- Everything at that current commit works together. Changes can be verified across all affected parts of the organization.
- Easy to split code into composable modules
- Easier dependency management
- One toolchain setup
- Code editors and IDEs are "workspace" aware
- Consistent developer experience
- ...

But they come with their own technical challenges. The more code you add into your repository, the slower the CI gets.

## Example Workspace

This repo is an example Nx Workspace. It has two applications. Each app has 15 libraries, each of which consists of 30 components. The two applications also share code.

If you run `nx dep-graph`, you will see something like this:

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx-azure-build/master/readme-assets/graph.png" width="800"></p>

### CI Provider

This example will use Gitlab CI, but you'll find similar setup for [Azure Pipelines](https://github.com/nrwl/nx-azure-build) and [Jenkins](https://github.com/nrwl/nx-jenkins-build) on Nx organization.

### **To see CI runs click [here](https://gitlab.com/yannickglt/nx-gitlab-build/pipelines).**

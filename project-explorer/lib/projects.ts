import projectData from "@/data/projects.json";

export type Project = (typeof projectData)[number];

export const projects: Project[] = projectData;

export function findProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

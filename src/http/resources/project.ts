import { Project } from "../../entities/Project";

export class ProjectResource {
    id: number;
    slug: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;

    constructor(project: Project) {
        this.id = project.id;
        this.slug = project.slug;
        this.title = project.title;
        this.description = project.description;
        this.status = project.status;
        this.created_at = project.created_at.toLocaleDateString();
        this.updated_at = project.updated_at.toLocaleDateString();
    }
}
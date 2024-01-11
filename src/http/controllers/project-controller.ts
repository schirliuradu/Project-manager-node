import { Request, Response } from 'express';
import {ProjectResource} from "../resources/project";
import {ProjectService} from "../../services/project-service";
import {CreateProjectRequestDto} from "../../dto/requests/create-project-request-dto";

export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    async findProject(req: Request, res: Response) {
        try {
            const projectId = Number(req.params.project);
            const project = await this.projectService.findProject(projectId);

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json(new ProjectResource(project));
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteProject(req: Request, res: Response) {
        try {
            const projectId = Number(req.params.project);
            const project = await this.projectService.findProject(projectId);

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            await this.projectService.deleteProject(project);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProjects(_: Request, res: Response) {
        try {
          const projects = await this.projectService.getProjects();

          res.json(projects.map(project => new ProjectResource(project)));
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createProject(req: Request, res: Response) {
        const requestDto = CreateProjectRequestDto.fromRequest(req);

        try {
            const project = await this.projectService.createProject(requestDto);

            res.json(new ProjectResource(project));
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

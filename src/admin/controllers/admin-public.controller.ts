import { Controller } from '@nestjs/common';
import { AdminPublicService } from '../services/admin-public.service';

@Controller()
export class AdminPublicController {
    constructor(private service: AdminPublicService) {}
}

import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SyncPayloadDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SyncService {
  constructor(
    @InjectQueue('syncQueue') private syncQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async processSync(userId: string, syncPayload: SyncPayloadDto) {
    const results = [];

    for (const event of syncPayload.events) {
      // Create a SyncEvent record to track processing
      const syncEvent = await this.prisma.syncEvent.create({
        data: {
          id: event.id,
          entity: event.entity,
          entityId: event.entityId,
          action: event.action,
          payload: event.payload,
          status: 'PENDING',
        }
      });

      // Add to BullMQ for background processing
      await this.syncQueue.add('process-sync-event', {
        syncEventId: syncEvent.id,
        userId,
        event,
      });

      results.push({ id: event.id, status: 'QUEUED' });
    }

    return { success: true, processed: results };
  }

  async getSyncStatus(userId: string) {
    // In a real scenario we might filter sync events by user ID
    // For now we'll just get the latest sync events
    return this.prisma.syncEvent.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' }
    });
  }
}

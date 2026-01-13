import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'events.json');

// 确保数据目录存在
async function ensureDataDir() {
    const dir = path.dirname(DATA_FILE);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// 读取事件数据
async function readEvents() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

// 写入事件数据
async function writeEvents(events) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

// GET - 获取所有事件
export async function GET() {
    try {
        const events = await readEvents();
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error reading events:', error);
        return NextResponse.json({}, { status: 500 });
    }
}

// POST - 创建新事件
export async function POST(request) {
    try {
        const { date, event } = await request.json();

        if (!date || !event || !event.title) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const events = await readEvents();

        if (!events[date]) {
            events[date] = [];
        }

        events[date].push(event);
        await writeEvents(events);

        return NextResponse.json({ success: true, event });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}

// DELETE - 删除事件
export async function DELETE(request) {
    try {
        const { date, eventId } = await request.json();

        if (!date || !eventId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const events = await readEvents();

        if (events[date]) {
            events[date] = events[date].filter(e => e.id !== eventId);

            if (events[date].length === 0) {
                delete events[date];
            }

            await writeEvents(events);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}

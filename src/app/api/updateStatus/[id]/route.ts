import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id: taskId } = params; // Extract taskId from URL params

        if (!taskId) {
            return NextResponse.json({ message: 'Task ID is required' }, { status: 400 });
        }

        // Fetch the current status of the task
        const { data: task, error: fetchError } = await supabaseClient
            .from('job-submissions') // Replace with your actual table name
            .select('status')
            .eq('id', taskId)
            .single();

        if (fetchError || !task) {
            throw new Error(fetchError?.message || 'Task not found');
        }

        // Determine the new status based on the current status
        let newStatus;
        if (task.status === 'submitted') {
            newStatus = 'in progress';
        } else if (task.status === 'in progress') {
            newStatus = 'complete';
        } else {
            return NextResponse.json({ message: 'Invalid status transition or no update needed' }, { status: 400 });
        }

        // Update the task's status
        const { error: updateError } = await supabaseClient
            .from('job-submissions') // Replace with your actual table name
            .update({ status: newStatus })
            .eq('id', taskId);

        if (updateError) {
            throw new Error(updateError.message);
        }

        // Return success message with the new status
        return NextResponse.json({ message: 'Status updated successfully', newStatus }, { status: 200 });
    } catch (error) {
        console.error('Error updating status:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

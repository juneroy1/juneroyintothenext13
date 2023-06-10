// get (read)

import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) {
            return new Response("Prompt not found", {status:404})
        }


        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Prompt not found", {
            status: 500
        }) 
    }
}


// patch (update)
export const PATCH = async (request, {params}) => {

    const { prompt, tag} = await request.json();
    try {
        await connectToDB();

        const getprompt = await Prompt.findById(params.id).populate('creator');

        if (!getprompt) {
            return new Response("Prompt not found", {status:404})
        }

        getprompt.prompt = prompt;
        getprompt.tag = tag;

        await getprompt.save();


        return new Response(JSON.stringify(getprompt), {
            status: 200
        })
    } catch (error) {
        return new Response("false to update the prompt", {
            status: 500
        }) 
    }
}

// delete (delete)

// patch (update)
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        const getprompt = await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", {
            status: 200
        })
    } catch (error) {
        return new Response("false to delete the prompt", {
            status: 500
        }) 
    }
}
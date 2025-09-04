import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); //インスタンス化

export async function main() {
    try{
        await prisma.$connect(); //DB接続
    }catch (err) {
        return Error("Error");
    }
}

//全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try{
        await main();
        const posts = await prisma.post.findMany(); //全件取得
        return NextResponse.json({message: "Success", posts}, {status: 200});

    }catch (err) {
        return NextResponse.json({message: "Error"}, {status: 500});

    }finally{ //tryでもcatchでも最後にかならず実行される
        await prisma.$disconnect(); //DB切断
    }
};


//記事投稿API
export const POST = async (req: Request, res: NextResponse) => {
    try{
        const { title, description } = await req.json(); //reqからtitleとdescriptionを取得
    
        await main();
        const post = await prisma.post.create({data: { title, description }}); //記事作成
        return NextResponse.json({message: "Success", post}, {status: 201});

    }catch (err) {
        return NextResponse.json({message: "Error"}, {status: 500});

    }finally{ //tryでもcatchでも最後にかならず実行される
        await prisma.$disconnect(); //DB切断
    }
};


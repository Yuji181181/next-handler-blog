import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient(); //インスタンス化

//詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try{
        const id : number = parseInt(req.url.split("/blog/")[1]); //URLからidをnumber型で取得
    
        await main();
        const posts = await prisma.post.findFirst({where: { id }}); //そのidの記事を取得
        return NextResponse.json({message: "Success", posts}, {status: 200});

    }catch (err) {
        return NextResponse.json({message: "Error"}, {status: 500});

    }finally{ //tryでもcatchでも最後にかならず実行される
        await prisma.$disconnect(); //DB切断
    }
};

//記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
    try{
        const id : number = parseInt(req.url.split("/blog/")[1]); //URLからidをnumber型で取得
        const { title, description } = await req.json(); //reqからtitle, descriptionを取得
    
        await main();
        const posts = await prisma.post.update({ //記事更新
            data: { title, description },
            where: { id }
        })
        return NextResponse.json({message: "Success", posts}, {status: 200});

    }catch (err) {
        return NextResponse.json({message: "Error"}, {status: 500});

    }finally{ //tryでもcatchでも最後にかならず実行される
        await prisma.$disconnect(); //DB切断
    }
};

//記事削除API
export const DELETE = async (req: Request, res: NextResponse) => {
    try{
        const id : number = parseInt(req.url.split("/blog/")[1]); //URLからidをnumber型で取得
    
        await main();
        const posts = await prisma.post.delete({ //記事削除
            where: { id }
        })
        return NextResponse.json({message: "Success", posts}, {status: 200});

    }catch (err) {
        return NextResponse.json({message: "Error"}, {status: 500});

    }finally{ //tryでもcatchでも最後にかならず実行される
        await prisma.$disconnect(); //DB切断
    }
};
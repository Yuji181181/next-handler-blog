"use client"

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'


const postBlog = async (title: string | undefined, description: string | undefined) => {  //文字列or値が未定義の型
    const res = await fetch('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, description }),  //Jsonに変換
        headers: {  //リクエストに付加する追加情報の指定
            'Content-Type': 'application/json'   //JSON形式で送信することを指定
        }
    });
    return res.json();
}


const PostBlog = () => {

    const router = useRouter();  //ページ遷移
    const titleRef = useRef<HTMLInputElement|null>(null); //初期値null、HTMLInputElement型
    const descriptionRef = useRef<HTMLTextAreaElement|null>(null);


    const handleSubmit = async(e: React.FormEvent) => { //フォームの送信イベントを処理するための関数
        e.preventDefault();

        postBlog(titleRef.current?.value, descriptionRef.current?.value);  // .current?.value:もしcurrentがnullでなければvalueを取得

        router.push('/'); //トップページへ遷移
        router.refresh();
    }


    return (
        <>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
                    <form onSubmit={handleSubmit}> {/* 送信時にhandleSubmit関数を実行 */}
                        <input
                            ref={titleRef} //ref属性で参照を取得
                            placeholder="タイトルを入力"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                            ref={descriptionRef} //ref属性で参照を取得
                            placeholder="記事詳細を入力"
                            className="rounded-md px-4 py-2 w-full my-2"
                        ></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                        投稿
                        </button>
                    </form>
                </div>
            </div>
        </>
        )
}

export default PostBlog
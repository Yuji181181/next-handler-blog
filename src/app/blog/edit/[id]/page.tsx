"use client"

import { get } from 'http';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'


const editBlog = async (title: string | undefined, description: string | undefined, id: number) => { //記事を編集する関数
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, id }),  //Jsonに変換
        headers: {  //リクエストに付加する追加情報の指定
            'Content-Type': 'application/json'   //JSON形式で送信することを指定
        }
    });
    return res.json();
}


const getBlogById = async (id: number) => { //編集時に既存のデータを取得する関数
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.posts;
}


const deleteBlog = async (id: number) => { //記事を削除する関数
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: 'DELETE',
        headers: {  //リクエストに付加する追加情報の指定
            'Content-Type': 'application/json'   //JSON形式で送信することを指定
        }
    });
    return res.json();
}



const EditPost = ({params}:{params:{id:number}}) => { //main

  const router = useRouter();  //ページ遷移
  const titleRef = useRef<HTMLInputElement|null>(null); //初期値null、HTMLInputElement型
  const descriptionRef = useRef<HTMLTextAreaElement|null>(null);


  const handleSubmit = async(e: React.FormEvent) => { //送信ボタンを押したときの処理
    e.preventDefault();

    editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id);  // .current?.value:もしcurrentがnullでなければvalueを取得

    router.push('/'); //トップページへ遷移
    router.refresh();
  }


  const handleDelete = async() => { //削除ボタンを押したときの処理
    deleteBlog(params.id);
  }


  useEffect(() => { //編集ページの最初のレンダリングの時だけ実行
    getBlogById(params.id).then((data) => { //getBlogById関数で既存のデータを取得
      if (titleRef.current && descriptionRef.current) { //nullかどうかのチェック
        titleRef.current.value = data.title; //取得したデータをdata.titleにセット
        descriptionRef.current.value = data.description; //取得したデータをdata.descriptionにセット
      }
  })
}, []); //空の配列を渡すことで、最初のレンダリング時にのみ実行されるようにする


  return (
<>
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
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
          更新
        </button>
        <button onClick={handleDelete}className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
          削除
        </button>
      </form>
    </div>
  </div>
</>
  )
}

export default EditPost
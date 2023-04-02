import React from "react";
import { omit, pick } from "ramda";
import { useImmer } from "use-immer";
import useSWR from "swr";

import PageWrapper from "@/components/PageWrapper";
import { useGlobalStore } from "@/store";
import createId from "@/shared/createId";

const mapStateToProps = pick(["currentUser"]);

interface ITodo {
  id: string;
  text: string;
}

interface ITodoExtend {
  isNew: boolean;
  isEdit: boolean;
}

const Todo: React.FC = () => {
  const global = useGlobalStore(mapStateToProps);

  const [pageData, updatePageData] = useImmer<{
    todos: (ITodo & ITodoExtend)[];
  }>({
    todos: [],
  });

  // const handleAdd = () => {
  //   const newPost: ITodo & ITodoExtend = {
  //     id: createId(),
  //     text: "no data",
  //     isNew: true,
  //     isEdit: true,
  //   };

  //   updatePageData((draft) => {
  //     draft.todos.push(newPost);
  //   });
  // };

  // const handleEdit = (id: number) => {
  //   updatePageData((draft) => {
  //     const post = draft.todos.find((post) => post.id === id);
  //     post && (post.isEdit = true);
  //   });
  // };

  // const handleDel = async (id: number) => {
  //   await allAPI.deletePostsId({ id }).finally(() => {
  //     updatePageData((draft) => {
  //       const index = draft.todos.findIndex((post) => post.id === id);
  //       index !== -1 && draft.todos.splice(index, 1);
  //     });
  //   });
  // };

  // const handleSave = async (id: number) => {
  //   const $post: HTMLInputElement = document.getElementById(
  //     `post_id_${id}`,
  //   ) as HTMLInputElement;

  //   if (!$post) return;

  //   const post = pageData.todos.find((post) => post.id === id);

  //   if (!post) return;

  //   if (post?.isNew) {
  //     const newPost = {
  //       ...post,
  //       title: $post.value,
  //     };

  //     await allAPI
  //       .postPosts(omit(["id", "isNew", "isEdit"], newPost))
  //       .finally(() => {
  //         updatePageData((draft) => {
  //           const post = draft.todos.find((post) => post.id === id);
  //           if (post) {
  //             post.isEdit = false;
  //             post.isNew = false;
  //             post.title = $post.value;
  //           }
  //         });
  //       });
  //   } else {
  //     await allAPI.patchPostsId(post).finally(() => {
  //       updatePageData((draft) => {
  //         const post = draft.todos.find((post) => post.id === id);
  //         if (post) {
  //           post.isEdit = false;
  //           post.isNew = false;
  //           post.title = $post.value;
  //         }
  //       });
  //     });
  //   }
  // };

  // const handleCancel = (id: number) => {
  //   updatePageData((draft) => {
  //     const post = draft.todos.find((post) => post.id === id);
  //     post && (post.isEdit = false);
  //   });
  // };

  return (
    <PageWrapper>
      <div
        style={
          {
            // width: "30rem",
            // display: "flex",
            // flexDirection: "column",
            // margin: "1rem auto",
          }
        }
      >
        {/* <div style={{ textAlign: "right" }}>
          <span
            style={{ padding: "0.5rem", cursor: "pointer" }}
            onClick={handleAdd}
          >
            add
          </span>
        </div> */}
        {/* {pageData.todos.map((post) => (
          <div
            key={post.id}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {post.isEdit ? (
              <input
                id={`post_id_${post.id}`}
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                defaultValue={post.title}
              />
            ) : (
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {post.title}
              </div>
            )}

            {!post.isEdit && (
              <>
                <div
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={() => handleEdit(post.id)}
                >
                  edit
                </div>
                <div
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={() => handleDel(post.id)}
                >
                  del
                </div>
              </>
            )}

            {post.isEdit && (
              <>
                <div
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={() => handleSave(post.id)}
                >
                  save
                </div>
                <div
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={() => handleCancel(post.id)}
                >
                  cancel
                </div>
              </>
            )}
          </div>
        ))} */}
      </div>
    </PageWrapper>
  );
};
export default Todo;

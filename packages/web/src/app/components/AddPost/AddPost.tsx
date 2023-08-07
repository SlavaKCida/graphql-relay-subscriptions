import { FC, Suspense, useCallback, useState } from 'react'
import { Select, TextInput } from '../ui/Input'
import { T } from '../ui/T'
import { SmallErrorBoundary } from '../SmallErrorBoundary'
import { QueryListKey, useQueryKeys } from '../../GraphqlFetchKeyProvider'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { AddPost_AllUsersQuery } from './__generated__/AddPost_AllUsersQuery.graphql'
import { PostCreateInput } from '../../mutations/__generated__/useAddPostMutation.graphql'
import { useAddPost } from '../../mutations/useAddPost'
import { Button } from '../ui/Button'

export const AddPost: FC = () => {
  return (
    <div className="border-black/5 p-10 border rounded-lg shadow-modal">
      <T color="100" size="h3" className="mb-2" block>
        Add new post
      </T>
      <Suspense fallback="Loading">
        <SmallErrorBoundary>
          <AddPostForm />
        </SmallErrorBoundary>
      </Suspense>
    </div>
  )
}

export const AddPostForm: FC = () => {
  const { keys } = useQueryKeys()
  const fetchKey = keys[QueryListKey.Users]

  const [selectedUserId, setSelectedUserId] = useState<string>()
  const { isLoading, addPost } = useAddPost()
  const [postInput, setPostInput] = useState<PostCreateInput>({
    title: '',
    content: '',
  })

  const { allUsers } = useLazyLoadQuery<AddPost_AllUsersQuery>(
    graphql`
      query AddPost_AllUsersQuery {
        allUsers {
          id
          name
          email
        }
      }
    `,
    { fetchKey }
  )

  const user = allUsers.find((u) => u.id === selectedUserId)

  const handleAdd = useCallback(() => {
    const { title, content } = postInput

    if (!user || !title || !content) return

    addPost({
      variables: {
        authorEmail: user.email,
        data: postInput,
      },
      onCompleted: (_, errors) => {
        if (errors?.length) return
        setPostInput({ title: '', content: '' })
      },
    })
  }, [addPost, user, postInput])

  if (allUsers.length === 0) return null

  return (
    <div className="flex flex-col gap-4" key={keys[QueryListKey.Posts]}>
      <div className="grid grid-cols-2 gap-8">
        <Select<string>
          required
          isLoading={isLoading}
          label="Author"
          support="Select user to create a post"
          value={selectedUserId}
          onChangeValue={setSelectedUserId}
          options={
            allUsers.map((b) => ({
              value: b.id,
              label: `${b.name}`,
            })) || []
          }
          placeholder="Anyone"
        />
        <TextInput
          required
          isLoading={isLoading}
          label="Title"
          support="Define a title for your post"
          placeholder="Once upon..."
          value={postInput.title}
          onChangeText={(title) => setPostInput((p) => ({ ...p, title }))}
        />
      </div>
      <TextInput
        required
        isLoading={isLoading}
        label="Content"
        inputSize="large"
        support="Write whatever you want"
        placeholder="Let me tell you one story"
        value={postInput.content || ''}
        onChangeText={(content) => setPostInput((p) => ({ ...p, content }))}
      />

      <div>
        <Button
          onClick={handleAdd}
          disabled={!user || !postInput.title || !postInput.content}
        >
          Add post
        </Button>
      </div>
    </div>
  )
}

import React, {useState, useEffect} from 'react'
import Postcard from '../components/Postcard.jsx'
import Container from '../components/container/Container.jsx'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((result) => {
            if (result?.documents) {
                setPosts(result.documents)
            }
        }).catch((error) => {
            console.error('Failed to load posts:', error)
        })
    },[])

  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
           </div>
        </Container>
      
    </div>
  )
}

export default AllPosts

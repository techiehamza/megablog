import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({ title, content, slug, featuredImage, status , userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }

    
    }

    async updatePost(slug,{ title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );        
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }                                                                         
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Error deleting document:", error);
            return false;
        }
    }

    async getPost(slug) {                   
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Error getting document:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        }
        catch (error) {
            console.error("Error listing documents:", error);
            return false;
        }
    }

    //fileupload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
            return false;
        }    
    }

    async deleteFile (fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }   
    }

    getFileView(fileIdOrObject) {
        try {
            const fileId =
                fileIdOrObject?.fileId ||
                fileIdOrObject?.$id ||
                fileIdOrObject?.id ||
                fileIdOrObject;

            if (!fileId) {
                console.error("Error getting file preview: missing fileId", fileIdOrObject);
                return null;
            }

            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            return null;
        }
    }
}

const service = new Service();
export default service;
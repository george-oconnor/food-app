import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "../type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    platform: "com.jsm.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "694299f9000308de0626",
    userCollectionId: "user"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name)

        const userData = { 
            email: String(email), 
            name: String(name), 
            accountId: String(newAccount.$id), 
            avatar: String(avatarUrl) 
        };

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            userData
        );
    } catch (e) {
        console.error('Create user error:', e);
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [ Query.equal('accountId', currentAccount.$id) ]
        );

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.error('Get current user error:', e);
        throw new Error(e as string);
    }
}
export type Contact = { 
    id: string;
    name: string;
    phone: string;
    image: string | undefined;
}

export type RootStackParamList = {
    Home: undefined,
    Details: { id: string };
    AddContact: undefined;
    Camera: undefined;
}

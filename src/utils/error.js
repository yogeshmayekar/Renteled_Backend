class CustomErrorHandler extends Error {    //extended the javaScript inbild error handler
    constructor(status, msg){
        super()
        this.status = status;
        this.message=msg;
    }

    static alreadyExist(message){
        return new CustomErrorHandler(409, message);
    }
    
    static unableToCreateUser(message){
        return new CustomErrorHandler(500, message);
    }

    static incorerctCredentials(message="Incorrect Username or Password"){
        return new CustomErrorHandler(401, message);
    }
    
    static incorerctPassword(message="Incorrect Password"){
        return new CustomErrorHandler(401, message);
    }
    
    static unAuthorized(message="Access denies"){
        return new CustomErrorHandler(401, message);
    }

    static notFound(message="404 Not Found"){
        return new CustomErrorHandler(404, message);
    }

    static serverError(message="image uploading failed"){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToCreateHotel(message){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToUpdateHotel(message){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToDeleteHotel(message){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToFetchHotel(message){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToFindRoom(message="error!, unable to find and update a room"){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToCreateRoom(message="error!, unable to create a room, please try after some time"){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToDeleteRoom(message="error!, unable to delete a room, please try after some time"){
        return new CustomErrorHandler(500, message);
    }
    
    static unableToFetchRoom(message){
        return new CustomErrorHandler(500, message);
    }
}   

export default CustomErrorHandler;


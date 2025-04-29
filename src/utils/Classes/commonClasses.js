/**
 * Class representing a course entity.
 */
export class courseEntity {
    constructor(id, category, closestCourse, credits, description, diffLevel, hoursWeek, imgLink, relatedCert, title) {
        this.id = id;
        this.category = category;
        this.closestCourse = closestCourse;
        this.credits = credits;
        this.description = description;
        this.diffLevel = diffLevel;
        this.hoursWeek = hoursWeek;
        this.imgLink = imgLink;
        this.relatedCert = relatedCert;
        this.title = title;
    }
}



export class ProviderEntity {
    constructor(id, name, imgLink, imgAltLink) {
        this.id = id;
        this.name = name;
        this.imgLink = imgLink;
        this.imgAltLink = imgAltLink;
    }
}

export class OfferableCourse {
    constructor(id, date, discount, price, visibility, course, provider) {
        this.id = id;
        this.date = date;
        this.discount = discount;
        this.price = price;
        this.visibility = visibility;
        this.course = course;
        this.provider = provider;
    }
}

export class User{
    constructor( email, passwordHash) {
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
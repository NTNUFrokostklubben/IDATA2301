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
// todo delete this?
export class SignupEntity{
    constructor(name, passwordHash, email) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.email = email;

    }
}

export class CourseWithPrice {
    constructor(Course, minDiscountedPrice, closestDate, rating, numberOfRatings) {
        this.Course = Course;
        this.minDiscountedPrice = minDiscountedPrice;
        this.closestDate = closestDate;
        this.rating = rating;
        this.numberOfRatings = numberOfRatings;
    }
}

export class FilterQuery {
    constructor(dateRange, categories, diffLevels, courseSizeRange, ratingRange, priceRange, searchValue) {
        this.dateRange = dateRange;
        this.categories = categories;
        this.diffLevels = diffLevels;
        this.courseSizeRange = courseSizeRange;
        this.ratingRange = ratingRange;
        this.priceRange = priceRange;
        this.searchValue = searchValue;
    }
}

export class User{
    constructor( email, passwordHash) {
        this.email = email;
        this.passwordHash = passwordHash;
    }
}

export class reviewEntity {
    constructor(id, rating, comment, courseTitle, userName, profilePicture, courseID){
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.title = courseTitle;
        this.user = userName;
        this.profilePicture = profilePicture;
        this.courseId = courseID;
    }
}


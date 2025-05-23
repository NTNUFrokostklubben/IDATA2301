/**
 * Class representing a course entity.
 */
export class courseEntity {
    constructor(id, category, closestCourse, credits, description, diffLevel, hoursWeek, imgLink, relatedCert, title, certLink) {
        this.id = id;
        this.category = category;
        this.closestCourse = closestCourse;
        this.credits = credits;
        this.description = description;
        this.diffLevel = diffLevel;
        this.hoursWeek = hoursWeek;
        this.imgLink = imgLink;
        this.relatedCert = relatedCert;
        this.certLink = certLink
        this.title = title;
    }
}


export class ProviderEntity {
    constructor(id, name, logoLink, altLogoLink) {
        this.id = id;
        this.name = name;
        this.logoLink = logoLink;
        this.altLogoLink = altLogoLink;
    }
}


export class UserCourse {
    constructor(id, review, date, course, user) {
        this.id = id;
        this.review = review;
        this.date = date;
        this.course = course;
        this.user = user;
    }
}


export class Review {
    constructor(id, rating, reviewDate, comment, title) {
        this.id = id;
        this.reviewDate = reviewDate;
        this.comment = comment;
        this.title = title;
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

export class CourseWithPrice {
    constructor(Course, minDiscountedPrice, closestDate, rating, numberOfRatings) {
        this.course = Course;
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


export class User {
    constructor(id, name, email, role, profilePicture) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.profilePicture = profilePicture;
    }
}

export class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class reviewEntity {
    constructor(id, rating, comment, courseTitle, userName, profilePicture, courseID) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.title = courseTitle;
        this.user = userName;
        this.profilePicture = profilePicture;
        this.courseId = courseID;
    }
}





document.getElementById('submit_in_dating').addEventListener('click', function() {
    // to find interets and hobbies
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(checkbox => checkbox.value);
    const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(checkbox => checkbox.value);

    // calling matching function with interests and hobbies
    matching(interests, hobbies);
});

// function to find the best match based on interests and hobbies
function matching(interests, hobbies) {
    fetch('students.json')
        .then(response => response.json())
        .then(profiles => {
            // to get gender
            const user_gender = user_gender_function();
            
            const profiles_searched = profiles.filter(profile => profile.Gender !== user_gender);

            // initialising variables
            let max_intersection = 0;
            let right_match = null;

            // iterating through profiles
            profiles_searched.forEach(profile => {
                // to find intersection
                const interests_common = profile.Interests.filter(interest => interests.includes(interest)).length;
                const hobbies_common = profile.Hobbies.filter(hobby => hobbies.includes(hobby)).length;
                const intersection = interests_common + hobbies_common;

                // updating the best match
                if (intersection > max_intersection) {
                    max_intersection = intersection;
                    right_match = profile;
                }
            });

            // if match is found direct to page
            if (right_match) {
                finalmatch(right_match);
            } else {
                // if not show alert
                console.log('No right match found');
                alert('No right match found.');
            }
        })
        .catch(error => {
            // for errors
            console.error('Error fetching profiles:', error);
        });
}

//to get gender
function user_gender_function() {
    const gender = sessionStorage.getItem("Gender");
    return gender;
}

// redirecting with right details
function finalmatch(matchProfile) {
   
    const queryString = Object.keys(matchProfile)
        .map(key => `${key}=${encodeURIComponent(matchProfile[key])}`)
        .join('&');
    
    window.location.href = `match.html?${queryString}`;
}

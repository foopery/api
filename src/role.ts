import axios from 'axios';

async function test() {
    const test = Array.from({ length: 50 }).map(() => {
        return axios.post(
            'https://gips-test-api.limefriends.com/vote-items-on-users/batch',
            {
                itemIds: [88],
            },
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODYyODA1MywiZXhwIjoxNzM3MTgxNjUzfQ.r-EadYi_7Dj-SLgTyzfzlyo7IwxORKWzpNihkoyeXu4',
                },
            },
        );
    });

    await Promise.all(test);
}

test().then(() => console.log('done'));

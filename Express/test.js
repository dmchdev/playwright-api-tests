function test_post_members(){
	let new_member_data = {};
    for (let i=0; i<3; i++){
        new_member = generate_member();
        new_member_data[new_member['id']] = new_member;
        MEMBERS[new_member['id']] = new_member;

    }
}
function deleteDoctor(doctorId) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        // Make an AJAX request to the server to delete the doctor
        $.ajax({
            url: '/doctors/' + doctorId, // Update with your endpoint
            type: 'DELETE',
            success: function(result) {
                // On success, remove the row from the table
                $('#doctorTableBody').find(`tr:has(td:contains('${doctorId}'))`).remove();
                alert('Doctor deleted successfully!');
            },
            error: function(err) {
                alert('Error deleting doctor: ' + err.responseText);
            }
        });
    }
}

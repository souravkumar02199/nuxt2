export default function ({ redirect }) {
    const isAuthenticated = sessionStorage.getItem('user')
    if (!isAuthenticated) {
        return redirect('/signin')
    }
}

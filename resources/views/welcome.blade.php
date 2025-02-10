<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel 11 with React</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/index.jsx'])
</head>

<body>
    <div id="app"></div>
    <script>
        window.APP_CONFIG = {
            extensionId: "{{ env('REACT_APP_EXTENSION_ID', 'default_extension_id') }}"
        };
    </script>
</body>

</html>
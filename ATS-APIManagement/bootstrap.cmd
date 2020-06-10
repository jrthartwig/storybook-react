pushd ATS-APIManagement
call dotnet build
popd
pushd ATS-APIManagement\wwwroot
call npm install
popd
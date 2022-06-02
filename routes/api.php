<?php
use App\Http\Controllers\API\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route :: post('delete/{id}',[ProfileController::class, 'destroy']);
Route :: get('get-fields',[ProfileController::class, 'get_fields']);
Route :: get('profile-data',[ProfileController::class, 'GetData']);
Route :: get('geticon',[ProfileController::class, 'getICon']);
Route :: get('getFontFamily',[ProfileController::class, 'getFontFamily']);
Route :: get('url',[ProfileController::class, 'Url_store']);
Route :: get('get-profile-store',[ProfileController::class, 'get_profile_store']);
Route :: post('field',[ProfileController::class, 'field']);
Route :: post('customer-details',[ProfileController::class, 'customer_profile']);
Route :: post('post-address',[ProfileController::class, 'post_address']);
Route :: post('drage-fields',[ProfileController::class, 'drage_fields']); 
Route :: post('drage-profiles',[ProfileController::class, 'drage_profiles']);
Route :: get('getdrag',[ProfileController::class, 'getDrag']); 
Route :: post('postFontFamily',[ProfileController::class, 'Post_Font_Family']);
Route :: post('icon-upload',[ProfileController::class, 'Leftside_icon']); 
Route :: post('profile-update/{id}',[ProfileController::class, 'profileupdate']);
Route :: post('address-update/{id}',[ProfileController::class, 'addressupdate']);
Route :: post('gift-update/{id}',[ProfileController::class, 'giftupdate']);
Route :: post('coupons-update/{id}',[ProfileController::class, 'couponsupdate']);
Route :: post('fname-update/{id}',[ProfileController::class, 'fnameupdate']);
Route :: post('lname-update/{id}',[ProfileController::class, 'lnameupdate']);
Route :: post('email-update/{id}',[ProfileController::class, 'emailupdate']);
Route :: post('insert-sidebar',[ProfileController::class, 'InsertSidebar']);
Route :: post('insert-label',[ProfileController::class, 'InsertLabel']);
Route :: get('sidebar',[ProfileController::class, 'Sidebar']);
Route :: get('label-setting',[ProfileController::class, 'LabelSetting']);
Route :: get('get-customer/{id}',[ProfileController::class, 'index']);
Route :: get('productget',[ProfileController::class, 'post_address']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


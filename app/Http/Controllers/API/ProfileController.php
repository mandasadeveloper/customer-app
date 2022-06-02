<?php
namespace App\Http\Controllers\API; 
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
class ProfileController extends Controller 
{       

function InsertSidebar(Request $request){  
        $label=$request->input('label'); 
        $type=$request->input('type');  
        $store_url=$request->input('store_url'); 
        $all=array(
        'sidebar_label'=>$label,
        'label_type'=>$type,
        'store_url'=>$store_url);  
        $value = DB::table('admin_setting')->where('label_type','=',$type)->where('store_url','=',$store_url)->first();               
        if($value==null)DB::table('admin_setting')->insert($all);
        else DB::table('admin_setting')->where('label_type', '=',$type)->where('store_url', '=',$store_url)->update($all);
        return 'Data Update successfully';        
        }

        function post_address(Request $request){ 
            $address=$request->input('address');
            $address=json_decode($address);
            $store_url=$request->input('store_url');   
            $id=$address->customer_id;
            $customer_array = array("customer_address" =>$address);
            $shop = User::where('name',$store_url)->first();
            if(isset($address->id))$responce=$shop->api()->rest('PUT',"/admin/api/2021-07/customers/$id/addresses/$address->id.json",$customer_array);
            else $responce=$shop->api()->rest('POST',"/admin/api/2021-07/customers/$id/addresses.json",$customer_array);
            return $responce;
            }

        function getICon(Request $request){ 
            $name=$request->input('name'); 
            $data = DB::table('admin-icon-setting')->where('store_url',$name)->get();
            return $data;
            }

            function get_profile_store(Request $request){ 
            $arr=array();               
            $store_name=$request->input('store_name'); 
            $user_id=$request->input('user_id'); 
            $user = User::where('name',$store_name)->first();
            $request = $user->api()->rest('GET','/admin/api/customers/'.$user_id.'.json');
            $arr[]=$request['body']['customer'];
            $email=$request['body']['customer']->email;
            $filed = DB::table('customer_profile')->where('store-url','=',$store_name)->where('email','=',$email)->get();
            if(isset($filed[0]))
            $arr[]=json_decode($filed[0]->value);
            else 
            $arr[]=$filed;
            return $arr;
            }

            function customer_profile(Request $request){        
                $id=$request->input('id');
                $store_url=$request->input('store_url');    
                $first_name=$request->input('first_name');    
                $last_name=$request->input('last_name');  
                $email=$request->input('email');    
                $fields=$request->input('fields');    
                $shop = User::where('name',$store_url)->first();
                $customer_array = array(
                    "customer" => array( 
                        "first_name" =>$first_name,
                        "last_name"  =>$last_name,
                    )
                );
                $value = DB::table('customer_profile')->where('store-url', '=',$store_url)->where('email', '=',$email)->first();
                $all=array('value'=>$fields,'email'=>$email,'store-url'=>$store_url);  
                if ($value === null)DB::table('customer_profile')->insert($all);       
                else DB::table('customer_profile')->where('store-url', '=',$store_url)->where('email', '=',$email)->update($all);      
                $shop->api()->rest('PUT',"/admin/api/2021-07/customers/$id.json",$customer_array);
                return "User Profile Is Update";
            }

            function getFontFamily(Request $request){ 
                $name=$request->input('name'); 
                $data = DB::table('font-family-setting')->where('store_url',$name)->get();
                return $data;
            }

            function Post_Font_Family(Request $request){
                $font=$request->input('font'); 
                $store_url=$request->input('store_url'); 
                $all=array('font_family'=>$font,'store_url'=>$store_url);   
                $value = DB::table('font-family-setting')->where('store_url', '=',$store_url)->first();
                if($value==null){
                DB::table('font-family-setting')->insert($all);
                }else{
                DB::table('font-family-setting')->where('store_url', '=',$store_url)->update($all);   
                }
                return 'Font Update successfully';  
            }


    function Leftside_icon(Request $request){
    $label=$request->input('label');
    $store_url=$request->input('store_url');
    if($request->file('icon')){
    $file = $request->file('icon');
    $ext = $file->getClientOriginalExtension(); 
    $icon=time().'.'.$ext; 
    $file->move('icon',$icon);
    }else $icon="";
    $value = DB::table('admin-icon-setting')->where('label', '=',$label)->where('store_url', '=',$store_url)->first();
    $all=array('icon'=>$icon,'label'=>$label,'store_url'=>$store_url);
    if($value==null)DB::table('admin-icon-setting')->insert($all);   
    else DB::table('admin-icon-setting')->where('label', '=',$label)->where('store_url', '=',$store_url)->update($all);  
    return 'file inserted successfully';       
    }

// label update setting 

function InsertLabel(Request $request){  
    $fname=$request->input('fname'); 
    $lname=$request->input('lname'); 
    $email=$request->input('email');  
    $store_url=$request->input('store_url'); 
    $all=array(
    'fname'=>$fname,
    'lname'=>$lname ,
    'email'=>$email,
    'store_url'=>$store_url);     
    $value = DB::table('label_setting')->where('store_url', '=',$store_url)->first();
    if ($value === null)DB::table('label_setting')->insert($all);
    else DB::table('label_setting')->where('store_url', '=',$store_url)->update($all);
    return 'Label is Update';      
    }

function Sidebar(Request $request){ 
$name=$request->input('name'); 
$data = DB::table('admin_setting')->where('store_url',$name)->get();
return $data;
}

function LabelSetting(Request $request){ 
$name=$request->input('name'); 
$data = DB::table('label_setting')->where('store_url',$name)->get();
return $data;
}
            

function get_fields(Request $request){
$name=$request->input('name');
$filed = DB::table('admin_fields')->where('store_url',$name)->orderBy('orderby', 'asc')->get();
return $filed;       
}

    public function drage_fields(Request $request){        
        $orderby=$request->input('orderby');
         $id=$request->input('id');        
            DB::table('admin_fields')->where('id',$id)->update(['orderby'=>$orderby]);  
            return response()->json([
                'status'  => 200,
                'message' => "fields is update",
            ]);    
    }


    public function drage_profiles(Request $request){        
        $drag_data=$request->input('drag_data');
        $store_url=$request->input('store_url');      
        $value = DB::table('drag-table')->where('store-url', '=',$store_url)->first();
        if ($value === null) {
            $all=array('drag-value'=>$drag_data,'store-url'=>$store_url);       
            DB::table('drag-table')->insert($all);  
            return response()->json([
                'status'  => 200,
                'message' => 'successfully',
            ]);
        }        
        else{
            $all2=array('drag-value'=>$drag_data);       
            DB::table('drag-table')->where('store-url',$store_url)->update($all2);  
            return response()->json([
                'status'  => 200,
                'message' => 'Update',
            ]);    
        }
       
    }

    public function getDrag(Request $request){
        $name=$request->input('name');
        $drag = DB::table('drag-table')->where('store-url',$name)->get();
        return $drag[0];     
    }  


     function field(Request $request){        
        $field=$request->input('field');
        $label=$request->input('label');
        $store_url=$request->input('store_url');    
        $orderby=$request->input('orderby');
        $drag_id=$request->input('drag_id');
        $all=array('field'=>$field,'label'=>$label,'store_url'=>$store_url,'drag_id'=>$drag_id,'orderby'=>$orderby);                 
        DB::table('admin_fields')->insert($all);  
        return response()->json([
            'status'  => 200,
            'message' => 'successfully',
        ]); 
    }
     
     function destroy($id){        
        DB::table('admin_fields')->where('id',$id)->delete();
        return 'delete Item';
    }
}

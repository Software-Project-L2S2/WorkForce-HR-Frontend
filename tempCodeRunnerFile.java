import java.util.Arrays;

public class QuickSort{

    private int partition(int arr[],int low , int high){
        int pivot = arr[low];
        int left = low + 1 ;
        int right = high;


        while(left <= right ){
            while(left <= right && arr[left] <= pivot){

                left++;
            }
            while(left<=right && arr[right]> pivot){
                right--;
            }
            if(left<right){
                swap(arr,left,right);

            }
        }
        swap(arr,low,right);
        return right;
    }

    private static void swap(int arr[],int i , int j ){
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private void quicksort(int arr[], int low , int high){

        if(low < high){
            int pivotIndx = partition(arr,low,high);
            quicksort(arr,low,pivotIndx-1);
            quicksort(arr,pivotIndx+1,high);
        }
    }




static void printArray(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n; ++i)
     System.out.print(arr[i] + " ");
     System.out.println();
     }
    public static void main(String[] args) {
    int[] arr = {5, 2, 9, 1, 5, 6};
     printArray(arr);
    QuickSort qs = new QuickSort();
     qs.quicksort(arr, 0, arr.length -1);
     printArray(arr);
     }
    }

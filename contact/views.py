
from django.shortcuts import render, redirect
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            # You can add a success message here if needed
            return redirect('contact:contact_success')  # Redirect to a success page
    else:
        form = ContactForm()
    
    return render(request, 'contact/contact_form.html', {'form': form})



def contact_success_view(request):
    return render(request, 'contact/contact_success.html')

def contact(request):
    pass
